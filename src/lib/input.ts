import {
  itemLikedBySetKey,
  itemDislikedBySetKey,
  userLikedSetKey,
  userDislikedSetKey,
  mostLikedKey,
  mostDislikedKey
} from './key'
import {
  updateSimilarityFor,
  updateWilsonScore,
  updateRecommendationsFor
} from './algorithms'
import { Redis } from 'ioredis'
import Config from './config'

const updateSequence = async function(
  client: Redis,
  config: Config,
  userId: string,
  itemId: string
) {
  // let updateWilson = true;
  // if ('updateWilson' in options) {
  //   updateWilson = options.updateWilson ? true : false;
  // }

  await updateSimilarityFor(client, config.className, userId)
  return Promise.all([
    updateWilsonScore(client, config.className, itemId),
    updateRecommendationsFor(
      client,
      config.className,
      config.nearestNeighbors,
      config.numOfRecsStore,
      userId
    )
  ])
}

const changeRating = async function(
  client: Redis,
  config: Config,
  userId: string,
  itemId: string,
  options: any
) {
  let updateRecommendations = true
  if ('updateRecs' in options) {
    updateRecommendations = !!options.updateRecs
  }

  const removeRating = !!options.removeRating

  const feelingItemSet = options.liked
    ? itemLikedBySetKey(config.className, itemId)
    : itemDislikedBySetKey(config.className, itemId)
  const feelingUserSet = options.liked
    ? userLikedSetKey(config.className, userId)
    : userDislikedSetKey(config.className, userId)
  const mostFeelingSet = options.liked
    ? mostLikedKey(config.className)
    : mostDislikedKey(config.className)

  const result = await client.sismember(feelingItemSet, userId)

  if (result === 0 && !removeRating) {
    await client.zincrby(mostFeelingSet, 1, itemId)
  } else if (result > 0 && removeRating) {
    await client.zincrby(mostFeelingSet, -1, itemId)
  }

  removeRating
    ? await client.srem(feelingUserSet, itemId)
    : await client.sadd(feelingUserSet, itemId)
  removeRating
    ? await client.srem(feelingItemSet, userId)
    : await client.sadd(feelingItemSet, userId)

  const result2 = await client.sismember(feelingItemSet, userId)
  if (updateRecommendations && result2 > 0) {
    await updateSequence(client, config, userId, itemId)
  }
}

export const liked = function(
  client: Redis,
  config: Config,

  userId: string,
  itemId: string,
  options: any = {}
) {
  options.liked = true
  return changeRating(client, config, userId, itemId, options)
}

export const disliked = function(
  client: Redis,
  config: Config,

  userId: string,
  itemId: string,
  options: any = {}
) {
  options.liked = false
  return changeRating(client, config, userId, itemId, options)
}

export const unliked = function(
  client: Redis,
  config: Config,

  userId: string,
  itemId: string,
  options: any = {}
) {
  options.liked = true
  options.removeRating = true
  return changeRating(client, config, userId, itemId, options)
}

export const undisliked = function(
  client: Redis,
  config: Config,

  userId: string,
  itemId: string,
  options: any = {}
) {
  options.liked = false
  options.removeRating = true
  return changeRating(client, config, userId, itemId, options)
}
