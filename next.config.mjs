/** @type {import('next').NextConfig} */
const nextConfig = {
  // Preserve M0's "build doesn't gate on types" property. `next build` runs
  // tsc --noEmit by default; this pushes type errors to the editor only, so
  // deploys keep shipping. The eslint config option was dropped in Next 16 —
  // linting is now handled by `next lint` as a separate step.
  typescript: { ignoreBuildErrors: true },
};
export default nextConfig;
