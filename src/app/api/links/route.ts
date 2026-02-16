import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/adminApp";
import { verifyAuthToken, isAdmin } from "@/lib/firebase/auth-server";
import { Link, CreateLinkDto, UpdateLinkDto } from "@/types/link";

// GET - Fetch all links (public)
export async function GET() {
  try {
    const linksSnapshot = await adminDb
      .collection("links")
      .orderBy("order", "asc")
      .get();

    const links: Link[] = linksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Link[];

    return NextResponse.json(links);
  } catch (error) {
    console.error("Error fetching links:", error);
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 }
    );
  }
}

// POST - Create new link (authenticated)
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const decodedToken = await verifyAuthToken(token);

    // Check if user is admin
    if (!isAdmin(decodedToken.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Parse request body
    const body: CreateLinkDto = await request.json();

    // Validate required fields
    if (!body.name || !body.url || !body.description) {
      return NextResponse.json(
        { error: "Missing required fields: name, url, description" },
        { status: 400 }
      );
    }

    // Create link document
    const now = Date.now();
    const linkData = {
      name: body.name,
      url: body.url,
      description: body.description,
      tag: body.tag || null,
      order: body.order || 0,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await adminDb.collection("links").add(linkData);

    const newLink: Link = {
      id: docRef.id,
      ...linkData,
      tag: linkData.tag || undefined,
    };

    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    console.error("Error creating link:", error);
    return NextResponse.json(
      { error: "Failed to create link" },
      { status: 500 }
    );
  }
}

// PUT - Update existing link (authenticated)
export async function PUT(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const decodedToken = await verifyAuthToken(token);

    // Check if user is admin
    if (!isAdmin(decodedToken.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Parse request body
    const body: UpdateLinkDto = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Missing link ID" },
        { status: 400 }
      );
    }

    // Build update data
    const updateData: Record<string, unknown> = {
      updatedAt: Date.now(),
    };

    if (body.name !== undefined) updateData.name = body.name;
    if (body.url !== undefined) updateData.url = body.url;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.tag !== undefined) updateData.tag = body.tag || null;
    if (body.order !== undefined) updateData.order = body.order;

    // Update document
    await adminDb.collection("links").doc(body.id).update(updateData);

    // Fetch updated document
    const updatedDoc = await adminDb.collection("links").doc(body.id).get();

    if (!updatedDoc.exists) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    const updatedLink: Link = {
      id: updatedDoc.id,
      ...updatedDoc.data(),
    } as Link;

    return NextResponse.json(updatedLink);
  } catch (error) {
    console.error("Error updating link:", error);
    return NextResponse.json(
      { error: "Failed to update link" },
      { status: 500 }
    );
  }
}

// DELETE - Delete link (authenticated)
export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const decodedToken = await verifyAuthToken(token);

    // Check if user is admin
    if (!isAdmin(decodedToken.email)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get link ID from URL search params
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing link ID" },
        { status: 400 }
      );
    }

    // Delete document
    await adminDb.collection("links").doc(id).delete();

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Error deleting link:", error);
    return NextResponse.json(
      { error: "Failed to delete link" },
      { status: 500 }
    );
  }
}
