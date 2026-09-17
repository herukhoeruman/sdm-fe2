import { baseApi } from "./baseApi";

export interface RoleResponse {
  id: number;
  name: string;
}

export interface RoleOptionResponse {
  role: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  roles: RoleResponse[];
  nama: string;
  jabatan: string;
  divisi: string;
  parent: number;
  nama_atasan: string;
  penilaian: boolean;
  validasisdm: boolean;
}

export interface UpdateUserRolesPayload {
  id: string | number;
  roles: string[];
}

export interface MessageResponse {
  message: string;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserResponse[], void>({
      query: () => "/api/data/user",
      providesTags: ["Users"],
    }),
    getRoles: builder.query<RoleOptionResponse[], void>({
      query: () => "/api/data/user/roles",
      providesTags: ["Roles"],
    }),
    updateUserRoles: builder.mutation<MessageResponse, UpdateUserRolesPayload>({
      query: ({ id, roles }) => ({
        url: `/api/data/user/${id}/roles`,
        method: "PUT",
        body: { roles },
      }),
      invalidatesTags: ["Users", "Roles"],
    }),
  }),
});

export const { useGetUsersQuery, useGetRolesQuery, useUpdateUserRolesMutation } =
  userApi;
