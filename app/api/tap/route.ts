import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userData = userSnap.data();
    if (userData.energy <= 0) {
      return NextResponse.json({ error: 'No energy left' }, { status: 400 });
    }

    await updateDoc(userRef, {
      energy: userData.energy - 1,
      shrockBalance: userData.shrockBalance + 5,
    });

    return NextResponse.json({
      success: true,
      newBalance: userData.shrockBalance + 5,
      newEnergy: userData.energy - 1,
    });
  } catch (_) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
