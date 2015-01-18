package models

type ArrayPayload struct {
	Movies []Movie `json:"movies"`
}

type SinglePayload struct {
	Movie Movie `json:"movie"`
}

type Movie struct {
	Title        string `json:"title"`
	Themoviedbid int    `json:"themoviedbid"`
}
