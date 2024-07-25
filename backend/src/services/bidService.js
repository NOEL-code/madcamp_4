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
    return game.save();
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

    if (bidDataWithUserName.bidAmount > product.price) {
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

exports.closeGame = async (productId, winnerId, loserIds, bidAmount) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    if (product.winnerId) {
      throw new Error("The auction is already closed.");
    }

    product.dueDate = new Date(); // Set the close date

    // Credit the seller's account balance
    const seller = await User.findById(product.userId);
    if (!seller) {
      throw new Error("Seller not found");
    }

    seller.account.balance += bidAmount;
    await seller.save();

    loserIds;

    for (let i = 0; loserIds.length(); i++) {
      const loser = await User.findById(loserIds[i]);
      loser.account.balance += bidAmount;
      await loser.save();

      const newAlarm = {
        userId: loserIds[i],
        title: "낙찰 실패 ㅜㅜ",
        content: `회원님께서 입찰에 참여한 ${product.productName} 상품낙찰에 실패하셨습니다. `,
      };
    }

    console.log(
      `Credited ${bidAmount} to seller ${seller.name}, new balance: ${seller.account.balance}`
    );

    const newAlarm = {
      userId: winnerId,
      title: "아싸~ 낙찰 성공!",
      content: `회원님께서 입찰에 참여한 ${product.productName} 상품이 ${bidAmount}원으로 회원님께 낙찰되었습니다. `,
    };

    const saveAlarm = new Alarm(newAlarm);

    product.isClose = 1;

    return await product.save();
  } catch (error) {
    console.error("Error in closeBid service:", error);
    throw error;
  }
};
