export const ProjectSkeleton = () => (
  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-white/20 dark:border-white/10 animate-pulse">
    <div className="h-48 bg-gray-200 dark:bg-gray-700 w-full" />
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
      </div>
      <div className="flex gap-2">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16" />
      </div>
    </div>
  </div>
);

export const SkillSkeleton = () => (
  <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 animate-pulse">
    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6" />
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
    </div>
  </div>
);

export const ServiceSkeleton = () => (
  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 animate-pulse">
    <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-xl mb-6" />
    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
    </div>
    <div className="mt-8 h-8 bg-gray-200 dark:bg-gray-700 rounded w-32" />
  </div>
);

export const TestimonialSkeleton = () => (
  <div className="bg-blue-50/30 dark:bg-gray-800/30 p-8 rounded-2xl shadow-sm border border-blue-100/50 dark:border-gray-800 animate-pulse">
    <div className="space-y-2 mb-8">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
    </div>
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-2">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
      </div>
    </div>
  </div>
);
