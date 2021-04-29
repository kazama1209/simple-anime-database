export interface Year {
  value: number
  label: string
}

export interface Season {
  value: string
  label: string
}

export interface Anime {
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

export interface Staff {
  role: string
  name: string
}

export interface Cast {
  character: string
  name : string
}

export interface AnimeDetail {
  staffs: Staff[]
  casts: Cast[]
}

export interface Schedule {
  title: string
  sub_title: string
  st_time: string
  ed_time: string
  ch_name: string
}
