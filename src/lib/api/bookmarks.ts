import { supabase } from '@/lib/supabase'

export interface Bookmark {
  id: string
  user_id: string
  announcement_id: string
  created_at: string
  announcement?: {
    id: string
    title: string
    excerpt: string
    category: string
    department: string
    published_at: string
    image_url?: string
  }
}

/**
 * Check if an announcement is bookmarked by the current user
 */
export async function isBookmarked(userId: string, announcementId: string) {
  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('user_id', userId)
      .eq('announcement_id', announcementId)
      .single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows returned

    return { isBookmarked: !!data, error: null }
  } catch (error) {
    console.error('Error checking bookmark:', error)
    return { isBookmarked: false, error }
  }
}

/**
 * Add a bookmark
 */
export async function addBookmark(userId: string, announcementId: string) {
  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .insert({
        user_id: userId,
        announcement_id: announcementId,
      })
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error adding bookmark:', error)
    return { data: null, error }
  }
}

/**
 * Remove a bookmark
 */
export async function removeBookmark(userId: string, announcementId: string) {
  try {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('announcement_id', announcementId)

    if (error) throw error

    return { error: null }
  } catch (error) {
    console.error('Error removing bookmark:', error)
    return { error }
  }
}

/**
 * Toggle bookmark (add if not exists, remove if exists)
 */
export async function toggleBookmark(userId: string, announcementId: string) {
  try {
    const { isBookmarked: bookmarked } = await isBookmarked(userId, announcementId)

    if (bookmarked) {
      return await removeBookmark(userId, announcementId)
    } else {
      return await addBookmark(userId, announcementId)
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error)
    return { error }
  }
}

/**
 * Get all bookmarks for a user with announcement details
 */
export async function getUserBookmarks(userId: string) {
  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .select(`
        *,
        announcement:announcements!bookmarks_announcement_id_fkey(
          id,
          title,
          excerpt,
          category,
          department,
          published_at,
          image_url,
          author:users!announcements_author_id_fkey(id, name, avatar)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return { data: data as Bookmark[], error: null }
  } catch (error) {
    console.error('Error fetching bookmarks:', error)
    return { data: null, error }
  }
}

/**
 * Get bookmark count for a user
 */
export async function getBookmarkCount(userId: string) {
  try {
    const { count, error } = await supabase
      .from('bookmarks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    if (error) throw error

    return { count, error: null }
  } catch (error) {
    console.error('Error counting bookmarks:', error)
    return { count: 0, error }
  }
}
