const axios = require("axios");
const fs = require("fs");
const path = require("path");

const propertiesToRemove = [
    "metadata",
    "search_last_name",
    "oddsjam_id",
    "sport",
    "pandascore_id",
    "espn_id",
    "news_updated",
    "practice_description",
    "birth_city",
    "fantasy_data_id",
    "hashtag",
    "yahoo_id",
    "birth_date",
    "birth_state",
    "birth_country",
    "search_full_name",
    "high_school",
    "injury_body_part",
    "team_abbr",
    "competitions",
    "injury_start_date",
    "swish_id",
    "rotowire_id",
    "stats_id",
    "team_changed_at",
    "rotoworld_id",
    "search_first_name",
    "opta_id",
    "gsis_id",
    "practice_description",
    "sportradar_id",
    "practice_participation",
    "search_rank",
    "height",
    "injury_notes",
    "status",
    "depth_chart_order",
    "weight",
    "number",
    "active",
    "years_exp",
    "fantasy_positions"
];

const adpPropsToRemove = [
    "cmp_pct",
    "fum_lost",
    "gp",
    "pass_2pt",
    "pass_att",
    "pass_cmp",
    "pass_fd",
    "pass_int",
    "pass_td",
    "pass_yd",
    "pts_half_ppr",
    "pts_ppr",
    "pts_std",
    "rush_2pt",
    "rush_att",
    "rush_fd",
    "rush_td",
    "rush_yd",
    "bonus_rec_rb",
    "rec",
    "rec_0_4",
    "rec_10_19",
    "rec_20_29",
    "rec_30_39",
    "rec_40p",
    "rec_5_9",
    "rec_fd",
    "rec_td",
    "rec_yd",
    "bonus_rec_wr",
    "rec_2pt",
];

async function fetchData() {
    try {
        const { data: rawPlayerAdpData } = await axios.get(
            "https://api.sleeper.com/projections/nfl/2025?season_type=regular&position[]=DB&position[]=DEF&position[]=DL&position[]=K&position[]=LB&position[]=QB&position[]=RB&position[]=TE&position[]=WR&order_by=adp_dynasty_2qb"
        );
        let { data: rawPlayerData } = await axios.get(
            "https://api.sleeper.app/v1/players/nfl?limit=2000"
        );
        rawPlayerData = Object.values(rawPlayerData);
        return { rawPlayerData, rawPlayerAdpData };
    } catch (error) {
        console.error("Error fetching data from the API:", error);
        process.exit(1);
    }
}

async function processData() {
    try {
        const { rawPlayerData, rawPlayerAdpData } = await fetchData();
        if (
            !rawPlayerData ||
            !Array.isArray(rawPlayerData) ||
            !rawPlayerAdpData ||
            !Array.isArray(rawPlayerAdpData)
        ) {
            console.log("No valid data found in the files.");
            return;
        }

        const sortedPlayerData = rawPlayerData
            .map((d) => {
                var adp = rawPlayerAdpData.find(
                    (dp) => dp.player_id == d.player_id
                )?.stats;
                adpPropsToRemove.forEach((property) => {
                    adp && (adp[property] = undefined);
                });
                propertiesToRemove.forEach((property) => {
                    d[property] = undefined;
                });
                return { ...d, adpStats: adp };
            })
            .filter(
                (d) =>
                    d.adpStats?.adp_dynasty_2qb &&
                    ["QB", "WR", "TE", "RB"].includes(d.position)
            )
            .sort(
                (a, b) =>
                    a.adpStats.adp_dynasty_2qb - b.adpStats.adp_dynasty_2qb
            )
            .slice(0, 500);

        const outputFilePath = path.join("../data/", "players.json");
        fs.writeFileSync(
            outputFilePath,
            JSON.stringify(sortedPlayerData, null, 2)
        );
        console.log("Top 500 entries have been saved to", outputFilePath);
    } catch (error) {
        console.error("Error processing or writing data:", error);
    }
}

processData();
