import * as React from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { ChevronLeft, ChevronRight } from "lucide-react-native"
import { cn } from '../../lib/utils';

function Calendar({
  className,
  selected,
  onSelect,
  mode = "single",
  numberOfMonths = 1,
  ...props
}) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    return { daysInMonth, startingDayOfWeek, year, month }
  }
  
  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth)
  
  const previousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }
  
  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }
  
  const handleDayPress = (day) => {
    const selectedDate = new Date(year, month, day)
    onSelect?.(selectedDate)
  }
  
  const isSelected = (day) => {
    if (!selected) return false
    const date = new Date(year, month, day)
    if (mode === "single") {
      return selected?.toDateString() === date.toDateString()
    }
    return false
  }
  
  const isToday = (day) => {
    const today = new Date()
    return today.getFullYear() === year && 
           today.getMonth() === month && 
           today.getDate() === day
  }
  
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  const monthNames = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"]
  
  const days = []
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }
  
  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  
  return (
    <View className={cn("bg-background p-3 rounded-lg", className)} {...props}>
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity 
          onPress={previousMonth}
          className="p-2 rounded-md active:bg-accent"
          activeOpacity={0.7}
        >
          <ChevronLeft size={20} className="text-foreground" />
        </TouchableOpacity>
        
        <Text className="text-sm font-medium">
          {monthNames[month]} {year}
        </Text>
        
        <TouchableOpacity 
          onPress={nextMonth}
          className="p-2 rounded-md active:bg-accent"
          activeOpacity={0.7}
        >
          <ChevronRight size={20} className="text-foreground" />
        </TouchableOpacity>
      </View>
      
      {/* Week days */}
      <View className="flex-row mb-2">
        {weekDays.map((day) => (
          <View key={day} className="flex-1 items-center">
            <Text className="text-muted-foreground text-xs font-medium">
              {day}
            </Text>
          </View>
        ))}
      </View>
      
      {/* Days */}
      {weeks.map((week, weekIndex) => (
        <View key={weekIndex} className="flex-row mb-1">
          {week.map((day, dayIndex) => (
            <View key={dayIndex} className="flex-1 aspect-square p-0.5">
              {day ? (
                <TouchableOpacity
                  onPress={() => handleDayPress(day)}
                  className={cn(
                    "flex-1 items-center justify-center rounded-md",
                    isSelected(day) && "bg-primary",
                    isToday(day) && !isSelected(day) && "bg-accent",
                    !isSelected(day) && !isToday(day) && "active:bg-accent"
                  )}
                  activeOpacity={0.7}
                >
                  <Text 
                    className={cn(
                      "text-sm",
                      isSelected(day) && "text-primary-foreground font-medium",
                      isToday(day) && !isSelected(day) && "text-accent-foreground",
                      !isSelected(day) && !isToday(day) && "text-foreground"
                    )}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View className="flex-1" />
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

export { Calendar }
