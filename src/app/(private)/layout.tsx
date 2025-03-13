import TopBar from '@/components/top-bar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#FAFAFE]">
      <TopBar />
      {children}
    </div>
  );
};

export default Layout;
