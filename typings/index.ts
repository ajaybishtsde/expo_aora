// Video types
export interface Creator {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: any[];
  $updatedAt: string;
  accountId: string;
  avatar: string;
  email: string;
  username: string;
}

export interface VideoItem {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: any[];
  $updatedAt: string;
  creator: Creator;
  prompt: string;
  thumbnail: string;
  title: string;
  video: string;
}
export type VideoItemResponse = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  videoUrl: string;
  uploaderId: string;
  likes?: number;
  views?: number;
};
