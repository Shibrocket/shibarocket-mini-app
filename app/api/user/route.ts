import { doc, getDoc } from 'firebase/firestore';
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
    return NextResponse.json({
      success: true,
      shrockBalance: userData.shrockBalance || 0,
      energy: userData.energy || 400,
      streak: userData.streak || 0,
      referrals: userData.referrals || [],
      lastReset: userData.lastReset || null,
    });
  } catch (_) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
