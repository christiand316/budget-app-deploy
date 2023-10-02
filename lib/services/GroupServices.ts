import { z } from "zod";
import prisma from "../../prisma";
import {
  GroupUpdateType,
  GroupCreateType,
  GroupDeleteType,
} from "@lib/schemas/GroupSchemas";

export const GroupServices = {
  async GetAllGroups() {
    const groups = await prisma.group.findMany();
    return groups;
  },
  async GetGroupByOwnerId(id: string) {
    const group = await prisma.group.findFirst({
      where: {
        ownerId: id,
      },
    });
    return group;
  },
  async GetAllGroupSByOwnerId(id: string) {
    const groups = await prisma.group.findMany({
      where: {
        ownerId: id,
      },
    });
    return groups;
  },
  async CreateGroup(groupData: GroupCreateType) {
    console.log(groupData);

    try {
      const group = await prisma.group.create({
        data: {
          ...groupData,
        },
      });
      return group;
    } catch (e) {
      throw e;
    }
  },
  async UpdateGroup(id: string, groupData: Partial<GroupUpdateType>) {
    try {
      const group = await prisma.group.update({
        where: {
          id: id,
        },
        data: {
          ...groupData,
        },
      });
    } catch (e) {
      throw e;
    }
  },
  async DeleteGroup(id: string) {
    try {
      await prisma.budget.deleteMany({ where: { groupId: id } });
      const group = await prisma.group.delete({
        where: {
          id: id,
        },
      });
      return group;
    } catch (e) {
      throw e;
    }
  },
};

// async function asloaslasl(data: any) {
//     const validatedIncoming = z.object({
//         id: z.string().uuid(),
//         amount: z.number(),

//     }).parse(data)
//     await prisma.user.create({data: {...data}})
// }
/**
 * 
 * 
 * 
 *   async GetGroupRecipients(id: string) {
    try {
      const recipients = await prisma.recipient.findMany({
        where: {
          groupId: id,
        },
      });
      return recipients;
    } catch (e) {
      throw e;
    }
  },
  async GetPaymentGroups(id: string) {
    try {
      const paymentGroups = await prisma.paymentGroup.findMany({
        where: {
          groupId: id,
        },
      });
      return paymentGroups;
    } catch (e) {
      throw e;
    }
  },
 */
