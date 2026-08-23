# Images

## The rule

Focustime sells a beautiful place where everything is arranged. The photography
*is* the product demo, so a wrong or generic photo actively undermines the
proposition.

Two hard constraints:

1. **No interiors of properties that have not been secured.** If someone books
   with a particular house in their head and it is not the house they get, that
   is a real problem, not a marketing nuance.
2. **It has to actually be Galicia.** The previous image set included a
   turquoise Mediterranean cove, a Patagonian hiking trail, a North American
   timber cabin, an Australian architect's house, and an AI-generated villa with
   a pool. Galicia is Atlantic, green, granite and often grey. Showing anywhere
   else is a promise the week cannot keep.

Prefer few, large and good over many and mediocre.

## What is on the site now

Creative Commons / public domain photographs of real places in Galicia, from
Wikimedia Commons. All four are credited in the page footer, and three of them
also in a caption next to the image.

| File | Subject | Photographer | Licence |
|---|---|---|---|
| `sil-canyon-{1100,1800}.jpg` | Cañón do Sil, Ribeira Sacra — the hero | [Arsenio Blanco](https://commons.wikimedia.org/wiki/File:Ca%C3%B1%C3%B3n_do_Sil_-_Ribeira_Sacra.jpg) | CC BY-SA 4.0 |
| `ribeira-sacra-vineyard-{800,1200}.jpg` | Terraced vines above the Sil | [Tanja Freibott](https://commons.wikimedia.org/wiki/File:Vi%C3%B1edos_cerca_del_Can%C3%B3n_del_Sil_en_la_Ribeira_Sacra.jpg) | CC BY-SA 4.0 |
| `courel-mist-{1000,1800}.jpg` | Cloud in the valley, Serra do Courel | [jacilluch](https://commons.wikimedia.org/wiki/File:POR_O_COUREL_%E2%99%A5_Niebla_de_valle_(14524722517).jpg) | CC BY-SA 2.0 |
| `polbo-a-feira-{700,1000}.jpg` | Polbo á feira with bread and tinto | [Xosé Calvo](https://commons.wikimedia.org/wiki/File:Polboafeira.jpg) | Public domain |
| `og-focustime.jpg` | 1200×630 link preview, cropped from the hero | Arsenio Blanco | CC BY-SA 4.0 |

The CC BY-SA licences require attribution and that the images stay under the
same licence. **If you remove an image, remove its credit from the footer of
`index.html` too.**

## Replacing them with your own

A photography trip is planned for July 2027. When there are real photographs,
swapping them in is a file-for-file replacement — the markup does not change.

1. Export each at the two widths already in use (see the table above).
2. Keep the same filenames, or update `src`, `srcset` and the `width`/`height`
   attributes together — the intrinsic size attributes prevent layout shift, so
   they must match the actual files.
3. Delete the corresponding credit from the footer and the `<figcaption>`.
4. Rewrite the `alt` text to describe the new photograph.

To resize on macOS without extra tooling:

```bash
sips -Z 1800 -s format jpeg -s formatOptions 60 source.jpg --out images/name-1800.jpg
```

Note: `sips` can also write AVIF, but its output for wide crops fails to decode
in Chrome. The site is deliberately JPEG-only until there is a trustworthy
AVIF/WebP encoder in the pipeline.

## Still missing

- **A portrait of Tjaco** for the "Who's behind this" section. There is a
  commented-out slot in `index.html` — save a square image as
  `images/tjaco-800.jpg` and uncomment it. At a start-up this early, the face
  behind it is one of the strongest things on the page.
- A photograph of an actual house, once one is secured.
- A long table with people eating at it — the single most on-message image the
  site could have.

## If you need more licence-free imagery

Search Wikimedia Commons for the specific thing, not the concept: *Ribeira
Sacra*, *Cañón do Sil*, *hórreo Galicia*, *polbo á feira*, *Albariño*, *Serra do
Courel*, *Ancares*. Never search "team collaboration".
