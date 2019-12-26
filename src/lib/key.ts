import config from './config'

const USER = 'user'
const ITEM = 'item'

function joinKey(keyArr: string[]) {
  return [config.className].concat(keyArr).join(':')
}

export function userLikedSet(userId: string) {
  return joinKey([USER, userId, 'liked'])
}

export function userDislikedSet(userId: string) {
  return joinKey([USER, userId, 'disliked'])
}

export function itemLikedBySet(itemId: string) {
  return joinKey([ITEM, itemId, 'liked'])
}

export function itemDislikedBySet(itemId: string) {
  return joinKey([ITEM, itemId, 'disliked'])
}

export function mostLiked() {
  return joinKey(['mostLiked'])
}

export function mostDisliked() {
  return joinKey(['mostDisliked'])
}

export function recommendedZSet(userId: string) {
  return joinKey([USER, userId, 'recommendedZSet'])
}

export function scoreboardZSet() {
  return joinKey(['scoreboard'])
}

export function similarityZSet(userId: string) {
  return joinKey([USER, userId, 'similarityZSet'])
}

export function tempAllLikedSet(userId: string) {
  return joinKey([USER, userId, 'tempAllLikedSet'])
}
