# FreshTuff Website

Statyczna strona WWW dla usług FreshTuff (car detailing i pranie tapicerek).

## Struktura

- `index.html` – strona główna z hero sliderem i przeglądem usług
- `style.css` – główny arkusz stylów (podzielony komentarzami na sekcje)
- `main.js` – skrypt front-end (nawigacja, animacje, slidery)
- `sendmail.php` – prosty handler formularza kontaktowego
- Podstrony: `kontakt.html`, `myciecar.html`, `tapicerki.html`, `Car det.html`, `kostka.html`, `polerka.html`, `powloki.html`

## Uruchomienie (Vite)

Dev serwer:

```powershell
npm install ; npm run dev
```

Build produkcyjny:

```powershell
npm run build ; npm run preview
```

## Notatki

- Obrazy w sliderze wskazują lokalne ścieżki na Windows (np. `C:\Users\...`).
	Do wdrożenia produkcyjnego zaleca się przeniesienie grafik do katalogu projektu
	i odwoływanie się względnymi ścieżkami (np. `images/slide1.jpg`).
- `sendmail.php` to minimalny przykład. W środowisku produkcyjnym rozważ użycie
	PHPMailer + SMTP oraz dodatkową walidację i zabezpieczenia.