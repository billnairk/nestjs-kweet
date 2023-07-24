interface UploadType {
  children: string;
}

export default function Upload({ children }: UploadType) {
  return (
    <>
      <button>{children}</button>
    </>
  );
}
