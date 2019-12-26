import client from './client'
import * as Key from './key'

export const recommendFor = function(userId: string, numberOfRecs: number) {
  return client.zrevrange(Key.recommendedZSetKey(userId), 0, numberOfRecs)
}
export const bestRated = function() {
  return client.zrevrange(Key.scoreboardZSetKey(), 0, -1)
}
export const worstRated = function() {
  return client.zrange(Key.scoreboardZSetKey(), 0, -1)
}
export const bestRatedWithScores = function(numOfRatings: number) {
  return client.zrevrange(
    Key.scoreboardZSetKey(),
    0,
    numOfRatings,
    'WITHSCORES'
  )
}
export const mostLiked = function() {
  return client.zrevrange(Key.mostLikedKey(), 0, -1)
}
export const mostDisliked = function() {
  return client.zrevrange(Key.mostDislikedKey(), 0, -1)
}
export const usersWhoLikedAlsoLiked = function(itemId: string) {
  console.log(itemId)
  throw new Error('not yet implement')
}
export const mostSimilarUsers = function(userId: string) {
  return client.zrevrange(Key.similarityZSetKey(userId), 0, -1)
}
export const leastSimilarUsers = function(userId: string) {
  return client.zrange(Key.similarityZSetKey(userId), 0, -1)
}
export const likedBy = function(itemId: string) {
  return client.smembers(Key.itemLikedBySetKey(itemId))
}
export const likedCount = function(itemId: string) {
  return client.scard(Key.itemLikedBySetKey(itemId))
}
export const dislikedBy = function(itemId: string) {
  return client.smembers(Key.itemDislikedBySetKey(itemId))
}
export const dislikedCount = function(itemId: string) {
  return client.scard(Key.itemDislikedBySetKey(itemId))
}
export const allLikedFor = function(userId: string) {
  return client.smembers(Key.userLikedSetKey(userId))
}
export const allDislikedFor = function(userId: string) {
  return client.smembers(Key.userDislikedSetKey(userId))
}
export const allWatchedFor = function(userId: string) {
  return client.sunion(
    Key.userLikedSetKey(userId),
    Key.userDislikedSetKey(userId)
  )
}
