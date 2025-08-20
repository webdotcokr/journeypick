'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/domains/users/hooks/useAuth';
import { ExperienceService } from '@/domains/products/services/experienceService';
import { Experience } from '@/domains/products/types';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Edit, Trash2, Calendar, Users, MapPin, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function PlannerDashboardPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');

  // 로딩 중
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-warm-gray">Loading...</p>
        </div>
      </div>
    );
  }

  // 로그인하지 않은 경우
  if (!user || !profile) {
    router.push('/auth/signin');
    return null;
  }

  // Planner가 아닌 경우
  if (profile.role !== 'planner') {
    router.push('/');
    return null;
  }

  useEffect(() => {
    fetchExperiences();
  }, [user.id, activeTab]);

  const fetchExperiences = async () => {
    try {
      setIsLoading(true);
      const statusFilter = activeTab === 'all' ? undefined : activeTab;
      const data = await ExperienceService.getPlannerExperiences(user.id, statusFilter);
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (experienceId: number) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      await ExperienceService.deleteExperience(experienceId);
      setExperiences(experiences.filter(exp => exp.id !== experienceId));
      alert('Experience deleted successfully');
    } catch (error) {
      console.error('Error deleting experience:', error);
      alert('Failed to delete experience');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'pending_approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'suspended':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft':
        return 'Draft';
      case 'pending_approval':
        return 'Pending Review';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'suspended':
        return 'Suspended';
      default:
        return status;
    }
  };

  const tabs = [
    { key: 'all', label: 'All', count: experiences.length },
    { key: 'draft', label: 'Drafts', count: experiences.filter(e => e.status === 'draft').length },
    { key: 'pending_approval', label: 'Pending', count: experiences.filter(e => e.status === 'pending_approval').length },
    { key: 'approved', label: 'Live', count: experiences.filter(e => e.status === 'approved').length },
    { key: 'rejected', label: 'Rejected', count: experiences.filter(e => e.status === 'rejected').length },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-charcoal">My Experiences</h1>
            <p className="text-warm-gray mt-2">Manage your cultural experiences</p>
          </div>
          <Link href="/planner/experiences/new">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Experience
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warm-gray">Total Experiences</p>
                <p className="text-2xl font-bold text-charcoal">{experiences.length}</p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warm-gray">Live Experiences</p>
                <p className="text-2xl font-bold text-green-600">
                  {experiences.filter(e => e.status === 'approved').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warm-gray">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {experiences.filter(e => e.status === 'pending_approval').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warm-gray">Avg. Rating</p>
                <p className="text-2xl font-bold text-charcoal">
                  {experiences.length > 0 ? '4.8' : '0'}
                </p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Experience List */}
          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-warm-gray">Loading experiences...</p>
              </div>
            ) : experiences.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <Calendar className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No experiences yet</h3>
                <p className="text-gray-500 mb-4">Create your first cultural experience to get started</p>
                <Link href="/planner/experiences/new">
                  <Button>Create Experience</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {experiences.map(experience => (
                  <div key={experience.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-charcoal">{experience.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(experience.status)}`}>
                            {getStatusText(experience.status)}
                          </span>
                        </div>
                        
                        <p className="text-warm-gray mb-3 line-clamp-2">{experience.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-warm-gray">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {experience.location_text}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {experience.price.toLocaleString()} KRW
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {experience.min_participants}-{experience.max_participants} people
                          </div>
                          {experience.duration_hours && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {experience.duration_hours}h
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="secondary" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          onClick={() => handleDelete(experience.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {experience.rejection_reason && experience.status === 'rejected' && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-800">
                          <strong>Rejection Reason:</strong> {experience.rejection_reason}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}