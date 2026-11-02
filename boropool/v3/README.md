# BOROPOOL sample website v3

Preliminary website concept by aaliSoft. Demonstration content and sample data.

- `index.html` is the public front page. The hero is a route finder: a visitor completes the sentence "I'm a nurse looking at Germany" and sees the matching guide's stages. Below it are the guide board, how every guide is built, principles, services and a four-question assessment request.
- `guides/` holds one page per guide (six in English; two of them also in Bangla: Nurses in Germany and Caregivers in Canada). Each guide is a staged route with what you will need, what to watch out for, a realistic-expectations note and a cost checklist.
- `admin.html` is a clickable preview of the admin dashboard the BOROPOOL team would use: guide editor with a tab per language, enquiries inbox, assessment calendar and team roles. All data is sample data and nothing is saved or sent.
- `logo.svg` is a vector redraw of the monogram from BOROPOOL's public LinkedIn page. Replace it with the official file.
- `data.js` and `guides/*.html` are generated from one content source, so wording changes are made once.

Guide content is illustrative only and avoids salary and fee figures. The Bangla text was written for this demonstration and needs review by a native speaker. The assessment form sends or stores no data.

## Hosting
GitHub Pages, main branch, repository root. Path: `/boropool/v3/`.
