import { supabase } from './supabase'

export async function testConnection() {
  console.log('🔍 Testing Supabase connection...')
  
  try {
    // Test 1: Check categories
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*')
    
    if (catError) throw catError
    
    console.log('✅ Categories table connected!')
    console.log(`   Found ${categories.length} categories:`, categories.map(c => c.name).join(', '))
    
    // Test 2: Check departments
    const { data: departments, error: deptError } = await supabase
      .from('departments')
      .select('*')
    
    if (deptError) throw deptError
    
    console.log('✅ Departments table connected!')
    console.log(`   Found ${departments.length} departments:`, departments.map(d => d.name).join(', '))
    
    // Test 3: Check empty tables exist
    const { error: usersError } = await supabase.from('users').select('count')
    const { error: announcementsError } = await supabase.from('announcements').select('count')
    const { error: bookmarksError } = await supabase.from('bookmarks').select('count')
    const { error: notificationsError } = await supabase.from('notifications').select('count')
    
    if (usersError || announcementsError || bookmarksError || notificationsError) {
      throw new Error('Some tables are missing')
    }
    
    console.log('✅ All tables accessible!')
    console.log('✅ Users table ready')
    console.log('✅ Announcements table ready')
    console.log('✅ Bookmarks table ready')
    console.log('✅ Notifications table ready')
    
    console.log('\n🎉 SUCCESS! Supabase is fully connected and ready!')
    console.log('📊 Database Status: OPERATIONAL')
    
    return true
  } catch (error) {
    console.error('❌ Connection test failed:', error)
    return false
  }
}
