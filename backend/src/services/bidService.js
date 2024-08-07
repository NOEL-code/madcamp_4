const Product = require("../models/Product");
const { User } = require("../models/User");
const Alarm = require("../models/Alarm");
const Game = require("../models/Game");
const mongoose = require("mongoose");

exports.findGameByProductId = async (productId) => {
  try {
    const game = await Game.findOne({ productId: productId });
    return game;
  } catch (error) {
    console.error("Error in find Game");
  }
};

exports.createGame = async (gameData) => {
  console.log(gameData);
  try {
    const game = new Game(gameData);

    // userIds가 배열인지 확인하고, 배열이 아니라면 배열로 변환합니다.
    const userIds = Array.isArray(gameData.users)
      ? gameData.users
      : [gameData.users];

    for (let i = 0; i < userIds.length; i++) {
      const newAlarm = new Alarm({
        userId: userIds[i].userId,
        title: "맞다이 ㄱㄱ",
        content: `회원님께서 입찰에 참여한 상품은 맞다이로 낙찰자를 결정하게 되었습니디. 게임에 참여하시고 상품을 쟁취하세요!`,
      });
      console.log(newAlarm);
      await newAlarm.save();
    }

    return await game.save();
  } catch (error) {
    console.error("Error in createGame", error);
  }
};

exports.biddingProduct = async (productId, bidData) => {
  console.log("너가 왜?");
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const user = await User.findById(bidData.bidderId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the user has enough balance
    if (user.account.balance < bidData.bidAmount) {
      throw new Error("Insufficient balance");
    }

    const bidDataWithUserName = {
      bidderId: bidData.bidderId,
      bidderName: user.name,
      bidAmount: bidData.bidAmount,
    };

    user.account.balance -= bidData.bidAmount;
    await user.save();

    // Refund the previous highest bidder
    if (product.bidHistory.length > 0) {
      const lastBid = product.bidHistory[product.bidHistory.length - 1];
      const previousBidder = await User.findById(lastBid.bidderId);
      if (previousBidder) {
        previousBidder.account.balance += lastBid.bidAmount;
        await previousBidder.save();
        console.log(
          `Refunded ${lastBid.bidAmount} to previous bidder ${previousBidder.name}, new balance: ${previousBidder.account.balance}`
        );
      }
    }
    // Deduct the bid amount from the current bidder's balance
    console.log(
      `Deducted ${bidData.bidAmount} from current bidder ${user.name}, new balance: ${user.account.balance}`
    );

    product.bidHistory.push(bidDataWithUserName);

    if (bidDataWithUserName.bidAmount >= product.price) {
      product.price = bidDataWithUserName.bidAmount;
    } else {
      throw new Error("Bid amount must be higher than the current price");
    }

    await product.save();
    return product;
  } catch (error) {
    console.error("Error in biddingProduct service:", error);
    throw error;
  }
};

// 낙찰하기
exports.closeBid = async (productId, userId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    if (product.userId.toString() !== userId) {
      throw new Error("Unauthorized");
    }
    if (product.winnerId) {
      throw new Error("The auction is already closed.");
    }

    // Find the highest bid
    let highestBid = 0;
    let highestBidderId = null;
    for (const bid of product.bidHistory) {
      if (bid.bidAmount > highestBid) {
        highestBid = bid.bidAmount;
        highestBidderId = bid.bidderId;
      }
    }

    if (highestBidderId) {
      product.winnerId = highestBidderId; // Set the winnerId
    } else {
      throw new Error("No bids available to close the auction");
    }

    product.dueDate = new Date(); // Set the close date

    // Credit the seller's account balance
    const seller = await User.findById(product.userId);
    if (!seller) {
      throw new Error("Seller not found");
    }
    seller.account.balance += highestBid;
    await seller.save();

    console.log(
      `Credited ${highestBid} to seller ${seller.name}, new balance: ${seller.account.balance}`
    );

    const newAlarm = {
      userId: userId,
      title: "낙찰 성공",
      content: `회원님께서 입찰에 참여한 ${product.productName} 상품이 ${product.price}원으로 회원님께 낙찰되었습니다. `,
    };

    const saveAlarm = new Alarm(newAlarm);

    await saveAlarm.save();

    product.isClose = 1;

    return await product.save();
  } catch (error) {
    console.error("Error in closeBid service:", error);
    throw error;
  }
};

exports.updateSameScoreBid = async (productId) => {
  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      {
        isClose: 2,
      },
      { new: true }
    );

    return product;
  } catch (error) {
    console.error("Error in updateSameScoreBid", error);
    throw error;
  }
};

exports.updateScore = async (productId, userId, score) => {
  console.log(productId, userId, score);
  try {
    // productId로 게임을 찾습니다.
    const game = await Game.findOne({ productId });
    if (!game) {
      throw new Error("Game not found");
    }

    // users 배열에서 userId로 사용자를 찾습니다.
    const user = game.users.find((user) => user.userId.toString() === userId);
    if (!user) {
      throw new Error("User not found in game");
    }
    // 사용자의 점수를 업데이트합니다.
    user.score = score;
    user.isComplete = true;
    // 게임을 저장합니다.
    await game.save();

    return game;
  } catch (error) {
    console.error("Error in updateScore:", error);
    throw error;
  }
};
exports.closeGameService = async (productId, winnerId, loserIds, bidAmount) => {
  try {
    // Convert IDs to ObjectId
    const productObjectId = new mongoose.Types.ObjectId(productId);
    const winnerObjectId = new mongoose.Types.ObjectId(winnerId);
    const loserObjectIds = loserIds.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    const product = await Product.findById(productObjectId);
    if (!product) {
      throw new Error("Product not found");
    }

    // Fetch the game associated with the product
    const game = await Game.findOne({ productId: productObjectId });
    if (!game) {
      throw new Error("Game not found");
    }

    // Find the highest score
    const highestScore = Math.max(...game.users.map((user) => user.score));

    // Check if there are multiple users with the highest score
    const usersWithHighestScore = game.users.filter(
      (user) => user.score === highestScore
    );

    if (usersWithHighestScore.length > 1) {
      // If there are multiple users with the highest score, set isComplete to false for all users
      game.users.forEach((user) => {
        user.isComplete = false;
      });
      await game.save();

      // Update product status
      product.isClose = 2; // Assuming 2 indicates a game with multiple highest scores
      return await product.save();
    }

    product.dueDate = new Date(); // Set the close date

    // Credit the seller's account balance
    const seller = await User.findById(product.userId);
    if (!seller) {
      throw new Error("Seller not found");
    }

    seller.account.balance += bidAmount;
    await seller.save();

    for (let i = 0; i < loserObjectIds.length; i++) {
      const loser = await User.findById(loserObjectIds[i]);
      if (loser) {
        loser.account.balance += bidAmount;
        await loser.save();

        const newAlarm = new Alarm({
          userId: loser._id,
          title: "낙찰 실패 ㅜㅜ",
          content: `회원님께서 입찰에 참여한 ${product.productName} 상품낙찰에 실패하셨습니다. `,
        });

        await newAlarm.save();
      }
    }

    console.log(
      `Credited ${bidAmount} to seller ${seller.name}, new balance: ${seller.account.balance}`
    );

    const winnerAlarm = new Alarm({
      userId: winnerObjectId,
      title: "아싸~ 낙찰 성공!",
      content: `회원님께서 입찰에 참여한 ${product.productName} 상품이 ${bidAmount}원으로 회원님께 낙찰되었습니다. `,
    });

    await winnerAlarm.save();

    product.winnerId = winnerObjectId;
    product.isClose = 1;

    return await product.save();
  } catch (error) {
    console.error("Error in close Game service:", error);
    throw error;
  }
};
