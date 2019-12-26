import client from './client'
import {
  scoreboardZSetKey,
  recommendedZSetKey,
  mostLikedKey,
  mostDislikedKey,
  similarityZSetKey,
  itemLikedBySetKey,
  itemDislikedBySetKey,
  userLikedSetKey,
  userDislikedSetKey
} from './key'

export const recommendFor = function(userId: string, numberOfRecs: number) {
  return client.zrevrange(recommendedZSetKey(userId), 0, numberOfRecs)
}
export const bestRated = function() {
  return client.zrevrange(scoreboardZSetKey(), 0, -1)
}
export const worstRated = function() {
  return client.zrange(scoreboardZSetKey(), 0, -1)
}
export const bestRatedWithScores = function(numOfRatings: number) {
  return client.zrevrange(scoreboardZSetKey(), 0, numOfRatings, 'WITHSCORES')
}
export const mostLiked = function() {
  return client.zrevrange(mostLikedKey(), 0, -1)
}
export const mostDisliked = function() {
  return client.zrevrange(mostDislikedKey(), 0, -1)
}
export const usersWhoLikedAlsoLiked = function(itemId: string) {
  console.log(itemId)
  throw new Error('not yet implement')
}
export const mostSimilarUsers = function(userId: string) {
  return client.zrevrange(similarityZSetKey(userId), 0, -1)
}
export const leastSimilarUsers = function(userId: string) {
  return client.zrange(similarityZSetKey(userId), 0, -1)
}
export const likedBy = function(itemId: string) {
  return client.smembers(itemLikedBySetKey(itemId))
}
export const likedCount = function(itemId: string) {
  return client.scard(itemLikedBySetKey(itemId))
}
export const dislikedBy = function(itemId: string) {
  return client.smembers(itemDislikedBySetKey(itemId))
}
export const dislikedCount = function(itemId: string) {
  return client.scard(itemDislikedBySetKey(itemId))
}
export const allLikedFor = function(userId: string) {
  return client.smembers(userLikedSetKey(userId))
}
export const allDislikedFor = function(userId: string) {
  return client.smembers(userDislikedSetKey(userId))
}
export const allWatchedFor = function(userId: string) {
  return client.sunion(userLikedSetKey(userId), userDislikedSetKey(userId))
}
