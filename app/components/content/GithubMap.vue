<template>
	<div class="mt-6 w-full">
		<div v-if="loading" class="py-20 text-center">
			<div class="text-gray-600">Loading...</div>
		</div>
		<div v-else-if="error" class="py-20 text-center">
			<div class="text-red-500">{{ error }}</div>
		</div>
		<div v-else class="min-h-24 w-full">
			<div class="overflow-x-scroll">
				<div class="relative mb-1 h-5">
					<span v-for="(month, index) in months" :key="index" class="absolute text-xs text-gray-500" :style="{ left: month.margin + 'px' }">
						{{ month.name }}
					</span>
				</div>
				<div class="flex gap-px">
					<div v-for="(week, weekIndex) in weeks" :key="weekIndex" class="flex flex-col gap-px">
						<div
							v-for="(day, dayIndex) in week"
							:key="dayIndex"
							class="size-3 rounded-sm"
							:class="getLevelClass(day.level)"
							:title="`${day.count} contributions on ${new Date(day.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`"
						></div>
					</div>
				</div>
			</div>
			<div class="mt-2 flex items-center text-xs text-gray-500">
				<span>Less</span>
				<div v-for="n in 5" :key="n" class="mx-1 h-3 w-3 rounded-sm" :class="getLevelClass(n - 1)"></div>
				<span>More</span>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	githubUsername: {
		type: String,
		default: "meorionel",
	},
});

const loading = ref(true);
const error = ref(null);
const weeks = ref([]);
const months = ref([]);

// Get CSS class based on contribution level
const getLevelClass = (level) => {
	const classes = [
		"bg-gray-200", // level 0 - no contributions
		"bg-rose-dawn/25", // level 1 - low contributions
		"bg-rose-dawn/50", // level 2 - medium contributions
		"bg-rose-dawn/75", // level 3 - high contributions
		"bg-rose-dawn", // level 4 - very high contributions
	];
	return classes[level] || classes[0];
};

// Fetch GitHub contributions
const fetchContributions = async () => {
	try {
		const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${props.githubUsername}?y=last`);
		if (!response.ok) {
			throw new Error(`Failed to fetch contributions: ${response.status}`);
		}
		const data = await response.json();

		// Process the data into weeks
		processContributions(data.contributions);
	} catch (err) {
		error.value = err.message;
	} finally {
		loading.value = false;
	}
};

// Process contributions into weeks
const processContributions = (contributions) => {
	// Create an array for each day of the year
	const days = {};
	contributions.forEach((contribution) => {
		days[contribution.date] = contribution;
	});

	// Get start and end dates
	const dates = contributions.map((c) => c.date).sort();
	const startDate = new Date(dates[0]);
	const endDate = new Date(dates[dates.length - 1]);

	// Adjust start to the beginning of the week (Sunday)
	const startDay = startDate.getDay();
	const adjustedStart = new Date(startDate);
	adjustedStart.setDate(startDate.getDate() - startDay);

	// Calculate total weeks
	const totalDays = Math.ceil((endDate - adjustedStart) / (1000 * 60 * 60 * 24));
	const totalWeeks = Math.ceil(totalDays / 7);

	// Create weeks array
	const weeksArray = [];
	let currentMonth = null;
	const monthLabels = [];

	for (let weekIndex = 0; weekIndex < totalWeeks; weekIndex++) {
		const week = [];
		for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
			const currentDate = new Date(adjustedStart);
			currentDate.setDate(adjustedStart.getDate() + weekIndex * 7 + dayIndex);

			const dateStr = currentDate.toISOString().split("T")[0];
			const contribution = days[dateStr] || { date: dateStr, count: 0, level: 0 };

			week.push(contribution);

			// Check if we need to add a month label
			const monthName = currentDate.toLocaleString("en-US", { month: "short" });
			if (currentMonth !== monthName && dayIndex === 0) {
				currentMonth = monthName;
				monthLabels.push({
					name: monthName,
					weekIndex,
					margin: weekIndex * 13, // 12px block + 1px gap
				});
			}
		}
		weeksArray.push(week);
	}

	weeks.value = weeksArray;
	months.value = monthLabels;
};

onMounted(() => {
	fetchContributions();
});
</script>
