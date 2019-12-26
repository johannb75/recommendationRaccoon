import config from './config'

const USER = 'user'
const ITEM = 'item'

function joinKey(keyArr: string[]) {
  return [config.className].concat(keyArr).join(':')
}

export function userLikedSetKey(userId: string) {
  return joinKey([USER, userId, 'liked'])
}

export function userDislikedSetKey(userId: string) {
  return joinKey([USER, userId, 'disliked'])
}

export function itemLikedBySetKey(itemId: string) {
  return joinKey([ITEM, itemId, 'liked'])
}

export function itemDislikedBySetKey(itemId: string) {
  return joinKey([ITEM, itemId, 'disliked'])
}

export function mostLikedKey() {
  return joinKey(['mostLiked'])
}

export function mostDislikedKey() {
  return joinKey(['mostDisliked'])
}

export function recommendedZSetKey(userId: string) {
  return joinKey([USER, userId, 'recommendedZSet'])
}

export function scoreboardZSetKey() {
  return joinKey(['scoreboard'])
}

export function similarityZSetKey(userId: string) {
  return joinKey([USER, userId, 'similarityZSet'])
}

export function tempAllLikedSetKey(userId: string) {
  return joinKey([USER, userId, 'tempAllLikedSet'])
}
