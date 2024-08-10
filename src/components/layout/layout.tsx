interface LayoutProp {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProp) => {
  return (
    <>
      <div className="flex-1 flex-col w-full flex justify-center h-auto scrollbar-hide overflow-y-auto">
        <main className="max-w-[430px] w-full bg-customBackground relative mx-auto ">
          <div className="flex-grow overflow-hidden scrollbar-hide">{children}</div>
        </main>
      </div>
    </>
  );
};

export default Layout;
