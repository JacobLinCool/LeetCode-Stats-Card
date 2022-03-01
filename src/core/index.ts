import type { IConfig, IRawConfig } from "./types/types";
import { make_config } from "./config";
import { get_leetcode_data } from "./leetcode";
import Card, { get_404_card } from "./card";

export async function leetcode_card(config: IRawConfig | IConfig) {
    const merged_config = make_config(config);
    try {
        const data = await get_leetcode_data(merged_config.username, merged_config.site);
        const card = new Card(merged_config, data);
        const svg = card.export_svg();
        return svg;
    } catch (err) {
        console.error("Error", JSON.stringify(err), JSON.stringify(merged_config, null, 2));
        const card = get_404_card(merged_config);
        const svg = card.export_svg();
        return svg;
    }
}

export default leetcode_card;
