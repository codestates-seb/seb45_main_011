'use client';

import { useEffect, useState } from 'react';

import { LeafDataInfo } from '@/types/common';

import LeafInfo from '@/components/LeafInfo';
import data from '@/mock/leaf.json';

export default function Leaf() {
  const [leaf, setLeaf] = useState<LeafDataInfo | null>(null);
  useEffect(() => {
    console.log(data[0]);
    setLeaf(data[0]);
  });
  if (!leaf) return <p>전달된 leaf 데이터가 없습니다.</p>;
  return <LeafInfo leaf={leaf} />;
}
