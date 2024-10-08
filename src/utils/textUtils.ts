export const truncateText = (text: string, maxLength: number) => {
    if (!text) return ''; 
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };
  