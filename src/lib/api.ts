const access_token: string = process.env.NEXT_PUBLIC_ANNICT_API_ACCESS_TOKEN
const self_made_api_base_endpoint: string = process.env.NEXT_PUBLIC_SELF_MADE_API_BASE_ENDPOINT

// 年とシーズンを指定してアニメ情報を取得
export async function fetchAnimesByYearAndSeason (year: number, season:  string): Promise<Anime[]> {
  // 初回リクエストはデータの総数を調べるために実行
  const res = await fetch(`https://api.annict.com/v1/works?fields=id&per_page=50&filter_season=${year}-${season}&sort_watchers_count=desc&access_token=${access_token}`)
  const data = await res.json()

  const data_total_count: number = data.total_count
  const page_count: number = Math.ceil(data_total_count / 50)

  const animes: Anime[] = []

  for (var page: number = 1; page <= page_count; page++) {
    const res = await fetch(`https://api.annict.com/v1/works?fields=title,images,twitter_username,official_site_url,media_text,syobocal_tid,season_name_text&page=${page}&per_page=50&filter_season=${year}-${season}&sort_watchers_count=desc&access_token=${access_token}`)
    const data = await res.json()

    for (var i: number = 0; i < data.works.length; i++) {
      animes.push(data.works[i])
    }
  }

  if (animes) {
    return animes
  }
}

// タイトルからアニメ情報を取得（ある程度は部分一致でも引っかかるぽい）
export async function fetchAnimesByTitle (title: string): Promise<Anime[]> {
  const res = await fetch(`https://api.annict.com/v1/works?fields=title,images,twitter_username,official_site_url,media_text,syobocal_tid&filter_title=${title}&access_token=${access_token}`)
  const data = await res.json()
  const animes = data.works

  if (animes) {
    return animes
  }
}

// しょぼいカレンダーのTidからアニメ情報を取得
export async function fetchAnimeByTid (tid: string): Promise<AnimeDetails> {
  const res = await fetch(`${self_made_api_base_endpoint}/anime_details?tid=${tid}`)
  const anime = await res.json()

  if (anime) {
    return anime
  }
}

// 指定した期間先までに放送予定の番組表を取得する
export async function fetchSchedule (span: number): Promise<Schedule[]> {
  const res = await fetch(`${self_made_api_base_endpoint}/schedule?span=${span}`)
  const schedule = await res.json()

  if (schedule) {
    return schedule
  }
}
