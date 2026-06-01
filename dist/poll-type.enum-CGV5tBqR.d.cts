declare const BuildingType: {
    readonly RESIDENTIAL: "residential";
    readonly COMMERCIAL: "commercial";
    readonly RESIDENTIAL_COMMERCIAL: "residential_commercial";
};
type BuildingType = (typeof BuildingType)[keyof typeof BuildingType];

declare const PollType: {
    readonly CONSENSUS: "consensus";
    readonly COMMUNITY: "community";
};
type PollType = (typeof PollType)[keyof typeof PollType];

export { BuildingType as B, PollType as P };
