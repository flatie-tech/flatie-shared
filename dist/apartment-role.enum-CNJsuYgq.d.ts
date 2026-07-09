declare const ApartmentRole: {
    readonly OWNER: "owner";
    readonly TENANT: "tenant";
};
type ApartmentRole = (typeof ApartmentRole)[keyof typeof ApartmentRole];

export { ApartmentRole as A };
