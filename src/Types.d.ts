type Year = {
  value: number
  label: string
}

type Season = {
  value: string
  label: string
}

type Anime = {
  title: string
  images: {
    recommended_url: string
  }
  twitter_username: string
  official_site_url: string
  media_text: string
  syobocal_tid: string
  season_name_text: string
}

type AnimeDetails = {
  staffs: []
  casts: []
}

type Staff = {
  role: string
  name: string
}

type Cast = {
  character: string
  name : string
}

type Schedule = {
  title: string
  sub_title: string
  st_time: string
  ed_time: string
  ch_name: string
}
