const axios = require('axios');
const fs = require('fs');
const path = require('path');

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
    "search_rank"
];

async function fetchData() {
    try {
        const { data: rawPlayerAdpData } = await axios.get('https://api.sleeper.com/projections/nfl/2025?season_type=regular&position[]=DB&position[]=DEF&position[]=DL&position[]=K&position[]=LB&position[]=QB&position[]=RB&position[]=TE&position[]=WR&order_by=adp_dynasty_2qb');
        let { data: rawPlayerData } = await axios.get('https://api.sleeper.app/v1/players/nfl?limit=2000');
        rawPlayerData = Object.values(rawPlayerData);
        return { rawPlayerData, rawPlayerAdpData };
    } catch (error) {
        console.error('Error fetching data from the API:', error);
        process.exit(1);
    }
}

async function processData() {
    try {
        const { rawPlayerData, rawPlayerAdpData } = await fetchData();
        if (!rawPlayerData || !Array.isArray(rawPlayerData) || !rawPlayerAdpData || !Array.isArray(rawPlayerAdpData)) {
            console.log("No valid data found in the files.");
            return;
        }

        const sortedPlayerData = rawPlayerData
            .map(d => {
                var adp = rawPlayerAdpData.find(dp => dp.player_id == d.player_id)?.stats;
                propertiesToRemove.forEach((property) => {
                    d[property] = undefined; // Remove each specified property
                });
                return { ...d,  adpStats: adp };
            })
            .filter(d => d.adpStats?.adp_dynasty_2qb)
            .sort((a, b) => a.adpStats.adp_dynasty_2qb - b.adpStats.adp_dynasty_2qb)
            .slice(0, 1000);

        const outputFilePath = path.join("../data/", 'players.json');
        fs.writeFileSync(outputFilePath, JSON.stringify(sortedPlayerData, null, 2));
        console.log("Top 1000 entries have been saved to", outputFilePath);
    } catch (error) {
        console.error('Error processing or writing data:', error);
    }
}

processData();