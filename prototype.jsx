import React, { useState, useMemo } from 'react'
import {
  Calendar,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

// 模拟数据：房间列表
const ROOMS = [
  { id: 1, name: '会议室 A (10人)', type: 'meeting', capacity: 10 },
  { id: 2, name: '会议室 B (6人)', type: 'meeting', capacity: 6 },
  { id: 3, name: '实验室 101 (化学)', type: 'lab', capacity: 4 },
  { id: 4, name: '实验室 102 (物理)', type: 'lab', capacity: 4 },
]

// 模拟数据：已存在的预约
const INITIAL_BOOKINGS = [
  {
    id: 101,
    roomId: 1,
    user: '张三',
    title: '项目周会',
    startTime: '09:00',
    endTime: '10:00',
    date: '2026-01-30',
  },
  {
    id: 102,
    roomId: 3,
    user: '李四',
    title: '材料测试',
    startTime: '14:00',
    endTime: '16:00',
    date: '2026-01-30',
  },
]

// 辅助函数：生成时间段 (08:00 - 20:00)
const TIME_SLOTS = []
for (let i = 8; i < 20; i++) {
  TIME_SLOTS.push(`${i.toString().padStart(2, '0')}:00`)
}

export default function LabReservationApp() {
  const [selectedDate, setSelectedDate] = useState('2026-01-30') // 默认选中今天
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS)
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState('rooms') // 'rooms' or 'my_bookings'

  // 预约表单状态
  const [formRoomId, setFormRoomId] = useState(ROOMS[0].id)
  const [formStartTime, setFormStartTime] = useState('09:00')
  const [formDuration, setFormDuration] = useState(1) // 小时
  const [formTitle, setFormTitle] = useState('')
  const [currentUser] = useState('王五') // 模拟当前登录用户

  // 检查某个房间在某个时间点是否被占用
  const isOccupied = (roomId, timeSlot) => {
    return bookings.find(
      (b) =>
        b.roomId === roomId &&
        b.date === selectedDate &&
        timeSlot >= b.startTime &&
        timeSlot < b.endTime, // 简单逻辑：开始时间包含，结束时间不包含
    )
  }

  // 处理提交预约
  const handleBooking = (e) => {
    e.preventDefault()

    // 计算结束时间
    const startHour = parseInt(formStartTime.split(':')[0])
    const endHour = startHour + parseInt(formDuration)
    const endTime = `${endHour.toString().padStart(2, '0')}:00`

    // 简单冲突检测
    const hasConflict = bookings.some(
      (b) =>
        b.roomId === parseInt(formRoomId) &&
        b.date === selectedDate &&
        ((formStartTime >= b.startTime && formStartTime < b.endTime) ||
          (endTime > b.startTime && endTime <= b.endTime) ||
          (formStartTime <= b.startTime && endTime >= b.endTime)),
    )

    if (hasConflict) {
      alert('该时间段已有预约，请重新选择！')
      return
    }

    const newBooking = {
      id: Date.now(),
      roomId: parseInt(formRoomId),
      user: currentUser,
      title: formTitle,
      startTime: formStartTime,
      endTime: endTime,
      date: selectedDate,
    }

    setBookings([...bookings, newBooking])
    setShowModal(false)
    setFormTitle('')
    alert('预约成功！')
  }

  // 获取我的预约
  const myBookings = bookings.filter((b) => b.user === currentUser)

  return (
    <div className='min-h-screen bg-gray-50 font-sans text-gray-800 max-w-md mx-auto border-x border-gray-200 shadow-lg flex flex-col'>
      {/* 顶部导航栏 */}
      <header className='bg-blue-600 text-white p-4 shadow-md sticky top-0 z-10'>
        <div className='flex justify-between items-center'>
          <h1 className='text-lg font-bold flex items-center gap-2'>
            <Calendar size={20} /> 实验室预约助手
          </h1>
          <div className='text-sm bg-blue-700 px-3 py-1 rounded-full'>
            用户: {currentUser}
          </div>
        </div>
      </header>

      {/* 底部 Tab 切换 */}
      <div className='flex-1 overflow-y-auto pb-20'>
        {activeTab === 'rooms' ? (
          <>
            {/* 日期选择器 (简化版) */}
            <div className='bg-white p-4 border-b flex justify-between items-center'>
              <button className='p-2 hover:bg-gray-100 rounded-full'>
                <ChevronLeft size={20} />
              </button>
              <span className='font-semibold text-lg'>
                {selectedDate} (周五)
              </span>
              <button className='p-2 hover:bg-gray-100 rounded-full'>
                <ChevronRight size={20} />
              </button>
            </div>

            {/* 房间列表与时间轴 */}
            <div className='p-4 space-y-6'>
              {ROOMS.map((room) => (
                <div
                  key={room.id}
                  className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'
                >
                  <div className='p-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center'>
                    <div>
                      <h3 className='font-bold text-gray-800'>{room.name}</h3>
                      <span className='text-xs text-gray-500 flex items-center gap-1'>
                        <Users size={12} /> 容量: {room.capacity}人
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setFormRoomId(room.id)
                        setShowModal(true)
                      }}
                      className='bg-blue-100 text-blue-600 text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-blue-200 transition'
                    >
                      预约
                    </button>
                  </div>

                  {/* 时间轴可视化 */}
                  <div className='p-3 overflow-x-auto'>
                    <div className='flex gap-1 min-w-max'>
                      {TIME_SLOTS.map((time) => {
                        const booking = isOccupied(room.id, time)
                        const isMine = booking && booking.user === currentUser

                        return (
                          <div
                            key={time}
                            className='flex flex-col items-center gap-1'
                          >
                            <div
                              className={`w-10 h-8 rounded-md flex items-center justify-center text-xs border transition-colors
                                ${!booking ? 'bg-green-50 border-green-200 text-green-700' : ''}
                                ${booking && !isMine ? 'bg-red-50 border-red-200 text-red-700' : ''}
                                ${isMine ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : ''}
                              `}
                              title={
                                booking
                                  ? `${booking.user}: ${booking.title}`
                                  : '空闲'
                              }
                            >
                              {booking ? (isMine ? '我' : '占') : '空'}
                            </div>
                            <span className='text-[10px] text-gray-400'>
                              {time}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* 我的预约 Tab */
          <div className='p-4 space-y-4'>
            <h2 className='text-xl font-bold mb-4'>我的预约记录</h2>
            {myBookings.length === 0 ? (
              <div className='text-center py-10 text-gray-400'>暂无预约</div>
            ) : (
              myBookings.map((booking) => {
                const roomName = ROOMS.find(
                  (r) => r.id === booking.roomId,
                )?.name
                return (
                  <div
                    key={booking.id}
                    className='bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative'
                  >
                    <div className='flex justify-between items-start mb-2'>
                      <h3 className='font-bold text-lg'>{booking.title}</h3>
                      <span className='bg-green-100 text-green-700 text-xs px-2 py-1 rounded'>
                        已预约
                      </span>
                    </div>
                    <div className='text-sm text-gray-600 space-y-1'>
                      <p className='flex items-center gap-2'>
                        <Clock size={14} /> {booking.date} {booking.startTime}-
                        {booking.endTime}
                      </p>
                      <p className='flex items-center gap-2'>
                        <Users size={14} /> {roomName}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm('确定要取消这个预约吗？')) {
                          setBookings(
                            bookings.filter((b) => b.id !== booking.id),
                          )
                        }
                      }}
                      className='mt-3 w-full py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50'
                    >
                      取消预约
                    </button>
                  </div>
                )
              })
            )}
          </div>
        )}
      </div>

      {/* 底部导航条 */}
      <nav className='fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 flex justify-around py-3 text-xs font-medium text-gray-500 z-20'>
        <button
          onClick={() => setActiveTab('rooms')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'rooms' ? 'text-blue-600' : ''}`}
        >
          <Calendar size={24} />
          预约大厅
        </button>
        <button
          onClick={() => setActiveTab('my_bookings')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'my_bookings' ? 'text-blue-600' : ''}`}
        >
          <CheckCircle size={24} />
          我的预约
        </button>
      </nav>

      {/* 预约弹窗 Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4'>
          <div className='bg-white w-full max-w-sm rounded-2xl p-6 animate-in slide-in-from-bottom-10 fade-in duration-300'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='text-xl font-bold'>新建预约</h3>
              <button
                onClick={() => setShowModal(false)}
                className='p-1 hover:bg-gray-100 rounded-full'
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleBooking} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  选择房间
                </label>
                <select
                  className='w-full p-2 border border-gray-300 rounded-lg bg-white'
                  value={formRoomId}
                  onChange={(e) => setFormRoomId(e.target.value)}
                >
                  {ROOMS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    开始时间
                  </label>
                  <select
                    className='w-full p-2 border border-gray-300 rounded-lg bg-white'
                    value={formStartTime}
                    onChange={(e) => setFormStartTime(e.target.value)}
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    时长 (小时)
                  </label>
                  <select
                    className='w-full p-2 border border-gray-300 rounded-lg bg-white'
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                  >
                    {[1, 2, 3, 4].map((h) => (
                      <option key={h} value={h}>
                        {h} 小时
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  预约主题/用途
                </label>
                <input
                  type='text'
                  required
                  placeholder='例如：课题组周会'
                  className='w-full p-2 border border-gray-300 rounded-lg'
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
              </div>

              <div className='pt-2'>
                <button
                  type='submit'
                  className='w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200'
                >
                  确认提交
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
