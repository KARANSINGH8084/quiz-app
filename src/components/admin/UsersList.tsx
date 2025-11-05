import React, { useState, useMemo } from 'react';
import { Search, Users as UsersIcon, Trophy, Target, Calendar, CircleIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useAuth } from '../../context/AuthContext';
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "../ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
interface UsersListProps {
  onViewUser: (userId: string) => void;
}

export const UsersList: React.FC<UsersListProps> = ({ onViewUser }) => {
  const { getAllUsers, getUserResults } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [customFrom, setCustomFrom] = useState<string>('');
  const [customTo, setCustomTo] = useState<string>('');

  const users = useMemo(() => {
    return getAllUsers().filter(u => u.role !== 'admin');
  }, [getAllUsers]);

  const filteredUsers = useMemo(() => {
    let result = users;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        user =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }

    const now = new Date();
    const withinRange = (date: string, start: Date, end: Date) => {
      const d = new Date(date);
      return d >= start && d <= end;
    };

    switch (dateFilter) {
      case "today":
        result = result.filter(user =>
          new Date(user.joined_date).toDateString() === now.toDateString()
        );
        break;

      case "week":
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - 7);
        result = result.filter(user => withinRange(user.joined_date, weekStart, now));
        break;

      case "month":
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        result = result.filter(user => withinRange(user.joined_date, monthStart, now));
        break;

      case "year":
        const yearStart = new Date(now.getFullYear(), 0, 1);
        result = result.filter(user => withinRange(user.joined_date, yearStart, now));
        break;

      case "custom":
        if (customFrom && customTo) {
          result = result.filter(user =>
            withinRange(user.joined_date, new Date(customFrom), new Date(customTo))
          );
        }
        break;

      default: break;
    }

    return result;
  }, [users, searchQuery, dateFilter, customFrom, customTo]);

  const getUserStats = (userId: string) => {
    const results = getUserResults(userId);
    return {
      totalAttempts: results.length,
      bestScore: results.length > 0 ? Math.max(...results.map(r => r.percentage)) : 0,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <UsersIcon className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl">Users Management</h1>
          </div>
          <p className="text-muted-foreground">View and manage all registered users</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-50">
                <UsersIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-3xl">{users.length}</div>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-50">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-3xl">
                  {users.reduce((sum, u) => sum + (u.total_attempts || 0), 0)}
                </div>
                <p className="text-sm text-muted-foreground">Total Attempts</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-50">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-3xl">
                  {users.length > 0
                    ? Math.round(users.reduce((sum, u) => sum + (u.average_score || 0), 0) / users.length)
                    : 0}%
                </div>
                <p className="text-sm text-muted-foreground">Avg Score</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search + Date Filters */}
        <Card className="mb-6 border-0 shadow-md">
          <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            {/* Search */}
            <div className="relative w-full mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Buttons */}
            {/* <div className="flex flex-wrap gap-2">
              {[
                { label: "All", value: "all" },
                { label: "Today", value: "today" },
                { label: "This Week", value: "week" },
                { label: "This Month", value: "month" },
                { label: "This Year", value: "year" },
                { label: "Custom", value: "custom" },
              ].map((f) => (
                <Button
                  key={f.value}
                  variant={dateFilter === f.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDateFilter(f.value)}
                >
                  {f.label}
                </Button>
              ))}
            </div>

            {dateFilter === "custom" && (
              <div className="flex gap-3 mt-3">
                <Input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} className="w-[150px]" />
                <Input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} className="w-[150px]" />
              </div>
            )} */}
            {/* Filter Dropdown */}
            <DropdownMenu className="relative">
              <DropdownMenuTrigger>
                <Button variant="outline" className="sm:w-[320px] justify-between mb-4">
                  Filter Users
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[320px] p-3" align="start">
                {/* Filter Buttons */}
                <RadioGroup
                  value={dateFilter}
                  onValueChange={setDateFilter}
                  className="space-y-0 gap-1 w-75"
                >
                  {[
                    { label: "All", value: "all" },
                    { label: "Today", value: "today" },
                    { label: "This Week", value: "week" },
                    { label: "This Month", value: "month" },
                    { label: "This Year", value: "year" },
                    { label: "Custom", value: "custom" },
                  ].map((f) => (
                    <div
                      key={f.value}
                      className={`flex gap-8 items-center justify-between cursor-pointer px-4 py-2 rounded-lg ${dateFilter === f.value ? "bg-purple-100" : "hover:bg-gray-100"
                        }`}
                      onClick={() => setDateFilter(f.value)}
                    >
                      <span className="text-sm font-medium">{f.label}</span>

                      <RadioGroupItem
                        value={f.value}
                        checked={dateFilter === f.value}
                        onClick={() => setDateFilter(f.value)}
                        className="border-2 border-purple-600 text-purple-600 w-5 h-5"
                        circleClassName="fill-purple-500 size-3 "
                      />
                    </div>
                  ))}
                </RadioGroup>

                {/* Custom Date Inputs */}
                {dateFilter === "custom" && (
                  <>
                    <DropdownMenuSeparator />

                    <div className="space-y-2 mt-2">
                      <Input
                        type="date"
                        value={customFrom}
                        onChange={(e) => setCustomFrom(e.target.value)}
                        className="w-full"
                      />
                      <Input
                        type="date"
                        value={customTo}
                        onChange={(e) => setCustomTo(e.target.value)}
                        className="w-full"
                      />

                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          if (customFrom && customTo) {
                            // setOpen(false); // if you're using controlled state
                            document.body.click(); // force close fallback
                          }
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                  </>
                )}

              </DropdownMenuContent>
            </DropdownMenu>

          </CardContent>
        </Card>

        {/* User List */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>
              {filteredUsers.length} {filteredUsers.length === 1 ? 'User' : 'Users'}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <UsersIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No users found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredUsers.map(user => {
                  const stats = getUserStats(user.id);
                  return (
                    <div key={user.id} className="p-4 rounded-xl bg-white border hover:shadow-md">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        {/* User Profile */}
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex justify-center items-center text-white text-lg">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <Badge variant="secondary" className="mt-1 text-xs">
                              <Calendar className="w-3 h-3 mr-1" />Joined {user.joined_date}
                            </Badge>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-6 items-center text-center">
                          <div>
                            <div className="text-2xl text-purple-600">{stats.totalAttempts}</div>
                            <p className="text-xs text-muted-foreground">Attempts</p>
                          </div>
                          <div>
                            <div className="text-2xl text-green-600">{user.average_score}%</div>
                            <p className="text-xs text-muted-foreground">Avg Score</p>
                          </div>
                          <div>
                            <div className="text-2xl text-yellow-600">{stats.bestScore}%</div>
                            <p className="text-xs text-muted-foreground">Best</p>
                          </div>


                          <Button size="sm" variant="outline" onClick={() => onViewUser(user.id)}>
                            View Details
                          </Button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
