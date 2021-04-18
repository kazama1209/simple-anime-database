export const currentYear = new Date().getFullYear()

export const years = []
for (var y = currentYear; y >= 1963; y--) {
  years.push({
    value: `${y}`,
    label: `${y}`
  })
}

export const seasons = [
  { value: "winter", label: "冬" },
  { value: "spring", label: "春" },
  { value: "summer", label: "夏" },
  { value: "autumn", label: "秋" }
]

export const currentSeason = seasons[(Math.ceil((new Date().getMonth() +1 ) / 3)) - 1].value

const access_token = process.env.NEXT_PUBLIC_ANNICT_API_ACCESS_TOKEN

// 年とシーズンを指定してアニメ情報を取得
export async function fetchAnimesByYearAndSeason (year = currentYear, season = currentSeason) {
  // 初回リクエストはデータの総数を調べるために実行
  const res = await fetch(`https://api.annict.com/v1/works?fields=id&per_page=50&filter_season=${year}-${season}&sort_watchers_count=desc&access_token=${access_token}`)
  const data = await res.json()

  const data_total_count = data.total_count
  const page_count = Math.ceil(data_total_count / 50)

  const animes = []

  for (var page = 1; page <= page_count; page++) {
    const res = await fetch(`https://api.annict.com/v1/works?fields=title,images,twitter_username,official_site_url,media_text,twitter_hashtag,syobocal_tid,season_name_text&page=${page}&per_page=50&filter_season=${year}-${season}&sort_watchers_count=desc&access_token=${access_token}`)
    const data = await res.json()

    for (var i = 0; i < data.works.length; i++) {
      animes.push(data.works[i])
    }
  }

  if (animes) {
    return animes
  }
}

// タイトルからアニメ情報を取得（ある程度は部分一致でも引っかかるぽい）
export async function fetchAnimesByTitle (title) {
  const res = await fetch(`https://api.annict.com/v1/works?fields=title,images,twitter_username,official_site_url,media_text,twitter_hashtag,syobocal_tid&filter_title=${title}&access_token=${access_token}`)
  const data = await res.json()
  const animes = data.works

  if (animes) {
    return animes
  }
}

// しょぼいカレンダーのTidからアニメ情報を取得
export async function fetchAnimeByTid (tid) {
  const res = await fetch(`http://localhost:4567/api/anime_details?tid=${tid}`)
  const data = await res.json()

  if (data) {
    return data
  }
}

// しょぼいカレンダーのTid（タイトルID）を取得
export async function fetchTids () {
  // 初回リクエストはデータの総数を調べるために実行
  const res = await fetch(`https://api.annict.com/v1/works?fields=syobocal_tid&per_page=50&access_token=${access_token}`)
  const data = await res.json()

  const data_total_count = data.total_count
  const page_count = Math.ceil(data_total_count / 50)

  const tids = []

  for (var page = 1; page <= page_count; page++) {
    const res = await fetch(`https://api.annict.com/v1/works?fields=syobocal_tid&page=${page}&per_page=50&access_token=${access_token}`)
    const data = await res.json()

    for (var i = 0; i < data.works.length; i++) {
      tids.push(data.works[i].syobocal_tid)
    }
  }

  if (tids) {
    return tids
  }
}

// 指定した期間先までに放送予定の番組表を取得する
export async function fetchSchedule (span) {
  const res = await fetch(`http://localhost:4567/api/schedule?span=${span}`)
  const data = await res.json()

  if (data) {
    return data
  }
}
