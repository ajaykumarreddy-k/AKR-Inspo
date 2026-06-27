const sampleData = [
  { artist: "Santigold", composition: "Disparate Youth", year: "2012", director: "Sam Fleischner & Santigold", country: "United States" },
  { artist: "Wonder Spak", composition: "Paliaünichy", year: "2026", director: "Aliaksandr Karalicū", country: "Belarus" },
  { artist: "Active Child", composition: "Hanging On", year: "2012", director: "T.S. Pfeffer & Robert McHugh", country: "United States" },
  { artist: "Bedford Falls", composition: "KINO", year: "2022", director: "avi.musaifi", country: "Georgia" },
  { artist: "a-ha", composition: "Take On Me", year: "1985", director: "Steve Barron", country: "Norway" },
  { artist: "Daft Punk", composition: "Around the World", year: "1997", director: "Michel Gondry", country: "France" },
  { artist: "The White Stripes", composition: "Fell In Love With a Girl", year: "2002", director: "Michel Gondry", country: "United States" },
  { artist: "Peter Gabriel", composition: "Sledgehammer", year: "1986", director: "Stephen R. Johnson", country: "United Kingdom" },
  { artist: "Jamiroquai", composition: "Virtual Insanity", year: "1996", director: "Jonathan Glazer", country: "United Kingdom" },
  { artist: "Fatboy Slim", composition: "Weapon of Choice", year: "2001", director: "Spike Jonze", country: "United Kingdom" },
  { artist: "Beastie Boys", composition: "Sabotage", year: "1994", director: "Spike Jonze", country: "United States" },
  { artist: "Aphex Twin", composition: "Windowlicker", year: "1999", director: "Chris Cunningham", country: "United Kingdom" },
  { artist: "Björk", composition: "All Is Full of Love", year: "1999", director: "Chris Cunningham", country: "Iceland" },
  { artist: "The Chemical Brothers", composition: "Let Forever Be", year: "1999", director: "Michel Gondry", country: "United Kingdom" }
];

// Duplicate the data a few times to create a massive list like in the image
const extendedData = [];
for (let i = 0; i < 5; i++) {
    extendedData.push(...sampleData);
}

const tableBody = document.getElementById("table-body");

extendedData.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "grid-row";
    
    row.innerHTML = `
        <div>${item.artist}</div>
        <div>${item.composition}</div>
        <div>${item.year}</div>
        <div>${item.director}</div>
        <div>${item.country}</div>
        <div class="plus-col">+</div>
    `;
    
    tableBody.appendChild(row);
});
