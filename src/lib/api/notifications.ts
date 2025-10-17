import { supabase } from '@/lib/supabase'

export interface Notification {
  id: string
  user_id: string
  type: 'announcement' | 'system' | 'reminder'
  message: string
  related_news_id?: string
  is_read: boolean
  created_at: string
  announcement?: {
    id: string
    title: string
  }
}

export interface CreateNotificationData {
  user_id: string
  type: 'announcement' | 'system' | 'reminder'
  message: string
  related_news_id?: string
}

/**
 * Create a new notification
 */
export async function createNotification(notificationData: CreateNotificationData) {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert({
        ...notificationData,
        is_read: false,
      })
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error creating notification:', error)
    return { data: null, error }
  }
}

/**
 * Create notifications for multiple users
 */
export async function createBulkNotifications(notifications: CreateNotificationData[]) {
  try {
    const notificationsWithDefaults = notifications.map(n => ({
      ...n,
      is_read: false,
    }))

    const { data, error } = await supabase
      .from('notifications')
      .insert(notificationsWithDefaults)
      .select()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error creating bulk notifications:', error)
    return { data: null, error }
  }
}

/**
 * Get notifications for a user
 */
export async function getUserNotifications(userId: string, limit = 50) {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select(`
        *,
        announcement:announcements!notifications_related_news_id_fkey(id, title)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error

    return { data: data as Notification[], error: null }
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return { data: null, error }
  }
}

/**
 * Get unread notification count
 */
export async function getUnreadCount(userId: string) {
  try {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false)

    if (error) throw error

    return { count, error: null }
  } catch (error) {
    console.error('Error counting unread notifications:', error)
    return { count: 0, error }
  }
}

/**
 * Mark a notification as read
 */
export async function markAsRead(notificationId: string) {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error marking notification as read:', error)
    return { data: null, error }
  }
}

/**
 * Mark all notifications as read for a user
 */
export async function markAllAsRead(userId: string) {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false)
      .select()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error marking all notifications as read:', error)
    return { data: null, error }
  }
}

/**
 * Delete a notification
 */
export async function deleteNotification(notificationId: string) {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId)

    if (error) throw error

    return { error: null }
  } catch (error) {
    console.error('Error deleting notification:', error)
    return { error }
  }
}

/**
 * Delete all read notifications for a user
 */
export async function deleteReadNotifications(userId: string) {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('user_id', userId)
      .eq('is_read', true)

    if (error) throw error

    return { error: null }
  } catch (error) {
    console.error('Error deleting read notifications:', error)
    return { error }
  }
}

/**
 * Subscribe to real-time notification updates
 */
export function subscribeToNotifications(userId: string, callback: (notification: Notification) => void) {
  const subscription = supabase
    .channel('notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        callback(payload.new as Notification)
      }
    )
    .subscribe()

  return subscription
}
