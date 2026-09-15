# Hero assets

Generated from `SST-HERO-ASSETS/` by `python scripts/prepare-hero-assets.py`.
Do not hand-edit — re-run the script after changing anything in the source pack.

| File                    | Source                                  | Used for |
| ----------------------- | --------------------------------------- | -------- |
| `plate.jpg`             | `environment/hero-background.webp`      | the environment foundation |
| `airplane.webp`         | `transport/airplane.png`                | flies the departure path |
| `cargo-ship.webp`       | `transport/cargo-ship.png`              | sails the bay, cut at the waterline |
| `logistics-campus.webp` | `infrastructure/warehouse.png`          | SST campus, bottom right |

Run with `--all` to also extract `tower.webp` and `turbine-base.webp`. Neither
is placed in the scene, so they are left out of the build by default.

## Notes on the source pack

The supplied rasters are 1024x1024 **JPEGs** regardless of their `.png` /
`.webp` extensions, so none of them carry alpha. The script keys the flat
backdrop out with a border flood fill, trims to the subject, and grades the
night-lit renders toward the plate's daylight.

Several filenames do not match their contents — the pack holds five distinct
subjects across sixteen files:

- turbine tower base — `energy/solar-panels`, `wind-turbine-blades`, `wind-turbine-tower`
- lit skyscraper — `environment/city`, `clouds-01`, `clouds-02`, `haze`, `port`
- logistics campus — all four `infrastructure/*`
- container vessel — `transport/train`, `cargo-ship`, `truck`
- airliner — `transport/airplane`
- and `environment/hero-background.webp`, which is correct

So the pack contains **no train, no truck, no rotor and no cloud plates**.
Those stay vector assets in `src/components/hero/assets/vectors.tsx`, drawn to
the pack's own proportions and palette, so every element in the brief is
present and animating.

`tower` and `turbine-base` can be extracted with `--all` but are not placed:
the tower is a night render that fights the daylight plate, and the turbine
frame is a close-up of a tower base with no rotor in it, so nothing in that
image can be made to turn.
