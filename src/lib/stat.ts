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
import { Redis } from 'ioredis'

export const recommendFor = function(
  client: Redis,
  className: string,
  userId: string,
  numberOfRecs: number
) {
  return client.zrevrange(
    recommendedZSetKey(className, userId),
    0,
    numberOfRecs
  )
}
export const bestRated = function(client: Redis, className: string) {
  return client.zrevrange(scoreboardZSetKey(className), 0, -1)
}
export const worstRated = function(client: Redis, className: string) {
  return client.zrange(scoreboardZSetKey(className), 0, -1)
}
export const bestRatedWithScores = function(
  client: Redis,
  className: string,
  numOfRatings: number
) {
  return client.zrevrange(
    scoreboardZSetKey(className),
    0,
    numOfRatings,
    'WITHSCORES'
  )
}
export const mostLiked = function(client: Redis, className: string) {
  return client.zrevrange(mostLikedKey(className), 0, -1)
}
export const mostDisliked = function(client: Redis, className: string) {
  return client.zrevrange(mostDislikedKey(className), 0, -1)
}
export const usersWhoLikedAlsoLiked = function(
  client: Redis,
  className: string,
  itemId: string
) {
  console.log(itemId)
  throw new Error('not yet implement')
}
export const mostSimilarUsers = function(
  client: Redis,
  className: string,
  userId: string
) {
  return client.zrevrange(similarityZSetKey(className, userId), 0, -1)
}
export const leastSimilarUsers = function(
  client: Redis,
  className: string,
  userId: string
) {
  return client.zrange(similarityZSetKey(className, userId), 0, -1)
}
export const likedBy = function(
  client: Redis,
  className: string,
  itemId: string
) {
  return client.smembers(itemLikedBySetKey(className, itemId))
}
export const likedCount = function(
  client: Redis,
  className: string,
  itemId: string
) {
  return client.scard(itemLikedBySetKey(className, itemId))
}
export const dislikedBy = function(
  client: Redis,
  className: string,
  itemId: string
) {
  return client.smembers(itemDislikedBySetKey(className, itemId))
}
export const dislikedCount = function(
  client: Redis,
  className: string,
  itemId: string
) {
  return client.scard(itemDislikedBySetKey(className, itemId))
}
export const allLikedFor = function(
  client: Redis,
  className: string,
  userId: string
) {
  return client.smembers(userLikedSetKey(className, userId))
}
export const allDislikedFor = function(
  client: Redis,
  className: string,
  userId: string
) {
  return client.smembers(userDislikedSetKey(className, userId))
}
export const allWatchedFor = function(
  client: Redis,
  className: string,
  userId: string
) {
  return client.sunion(
    userLikedSetKey(className, userId),
    userDislikedSetKey(className, userId)
  )
}
