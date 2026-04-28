declare const BuildingType: {
    readonly RESIDENTIAL: "RESIDENTIAL";
    readonly COMMERCIAL: "COMMERCIAL";
    readonly RESIDENTIAL_COMMERCIAL: "RESIDENTIAL_COMMERCIAL";
};
type BuildingType = (typeof BuildingType)[keyof typeof BuildingType];

declare const PollType: {
    readonly CONSENSUS: "CONSENSUS";
    readonly COMMUNITY: "COMMUNITY";
};
type PollType = (typeof PollType)[keyof typeof PollType];

export { BuildingType as B, PollType as P };
