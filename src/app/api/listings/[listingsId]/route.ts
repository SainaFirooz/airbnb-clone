/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";
import getCurrentUser from "../../../actions/getCurrentUser";

interface IParams {
  listingsId?: string;
}

export async function DELETE(
  request: Request,
  context: { params: Promise<IParams> }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingsId } = await context.params;
  console.log("Received params:", await context.params);
  console.log("Received listingsId:", listingsId);
  console.log("Current user:", currentUser);

  if (!listingsId || typeof listingsId !== "string") {
    return NextResponse.json({ error: "Invalid listingsId" }, { status: 400 });
  }

  let queryParameters: any = { id: listingsId };

  if (!currentUser.isAdmin) {
    queryParameters.OR = [{ userId: currentUser.id }];
  }

  console.log("Query parameters:", queryParameters);

  const listing = await prisma.listing.deleteMany({
    where: queryParameters,
  });

  console.log("Delete result:", listing);

  if (listing.count === 0) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  return NextResponse.json(listing, { status: 200 });
}
