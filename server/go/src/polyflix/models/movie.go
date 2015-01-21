package models

// ArrayPayload struct to hold multiple movies for JSON marshalling
type ArrayPayload struct {
	Movies []Movie `json:"movies"`
}

// SinglePayload struct to hold a single movie for JSON marshalling
type SinglePayload struct {
	Movie Movie `json:"movie"`
}

// Movie type for movie objects
type Movie struct {
	Title        string `json:"title"`
	Themoviedbid int    `json:"themoviedbid"`
}
