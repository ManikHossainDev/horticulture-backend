export type TUserStatus =  "Active" | "Blocked" | "Delete"
export interface IUserFilter {
    searchTerm?: string;
    role?: string;
    email?: string

}