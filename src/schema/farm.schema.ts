import { z } from "zod";

export const createFarmFormSchema = z.object({
    farmName: z.string().min(1, "Farm name is required"),
    ownerName: z.string().min(1, "Owner name is required"),
    location: z.string().min(1, "Location is required"),
    isPartner: z.enum(["yes", "no"], {
        errorMap: () => ({ message: "Please select Yes or No" }),
    }),
});

export type CreateFarmForm = z.infer<typeof createFarmFormSchema>;


export const updateFarmFormSchema = z.object({
    farmName: z.string().min(1, "Farm name cannot be empty").optional(),
    ownerName: z.string().min(1, "Owner name cannot be empty").optional(),
    location: z.string().min(1, "Location cannot be empty").optional(),
    isPartner: z
        .enum(["yes", "no"], {
            errorMap: () => ({ message: "Please select Yes or No" }),
        })
        .optional(),
});

export type UpdateFarmForm = z.infer<typeof updateFarmFormSchema>;
