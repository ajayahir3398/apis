exports.getUoMKeyValuePair = async (req, res) => {
  try {
    const uomList = [
      { key: "kg", value: "Kilogram" },
      { key: "g", value: "Gram" },
      { key: "lb", value: "Pound" },
      { key: "oz", value: "Ounce" },
      { key: "l", value: "Liter" },
      { key: "ml", value: "Milliliter" },
      { key: "pcs", value: "Pieces" },
      { key: "m", value: "Meter" },
      { key: "cm", value: "Centimeter" },
      { key: "mm", value: "Millimeter" },
    ];
    return res.status(200).json(uomList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
