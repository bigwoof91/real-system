function capitalize<T = string>(str: string): T | string {
  if (!str || typeof str !== 'string') {
    /**
     * @todo add logger util in `@real-system/utils`
     */
    console.log(
      '[@real-system/utils/capitalize]: capitalize requires a string argument'
    );
    return '';
  }
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

export { capitalize };
