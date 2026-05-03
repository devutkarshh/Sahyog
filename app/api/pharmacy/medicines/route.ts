import { type NextRequest, NextResponse } from "next/server"

// Mock medicine database with real-time availability
const medicines = [
  {
    id: "1",
    name: "Paracetamol",
    genericName: "Acetaminophen",
    strength: "500mg",
    form: "Tablet",
    manufacturer: "Sun Pharma",
    price: 25,
    availability: [
      { pharmacyId: "1", pharmacyName: "Nabha Medical Store", stock: 150, distance: 0.5 },
      { pharmacyId: "2", pharmacyName: "City Pharmacy", stock: 89, distance: 1.2 },
      { pharmacyId: "3", pharmacyName: "Health Plus", stock: 0, distance: 2.1 },
      { pharmacyId: "4", pharmacyName: "Care Pharmacy", stock: 45, distance: 3.5 },
    ],
    category: "Pain Relief",
    prescription: false,
  },
  {
    id: "2",
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    strength: "250mg",
    form: "Capsule",
    manufacturer: "Cipla",
    price: 85,
    availability: [
      { pharmacyId: "1", pharmacyName: "Nabha Medical Store", stock: 75, distance: 0.5 },
      { pharmacyId: "2", pharmacyName: "City Pharmacy", stock: 32, distance: 1.2 },
      { pharmacyId: "3", pharmacyName: "Health Plus", stock: 18, distance: 2.1 },
      { pharmacyId: "4", pharmacyName: "Care Pharmacy", stock: 0, distance: 3.5 },
    ],
    category: "Antibiotic",
    prescription: true,
  },
  {
    id: "3",
    name: "Crocin",
    genericName: "Paracetamol",
    strength: "650mg",
    form: "Tablet",
    manufacturer: "GSK",
    price: 35,
    availability: [
      { pharmacyId: "1", pharmacyName: "Nabha Medical Store", stock: 200, distance: 0.5 },
      { pharmacyId: "2", pharmacyName: "City Pharmacy", stock: 156, distance: 1.2 },
      { pharmacyId: "3", pharmacyName: "Health Plus", stock: 67, distance: 2.1 },
      { pharmacyId: "4", pharmacyName: "Care Pharmacy", stock: 23, distance: 3.5 },
    ],
    category: "Pain Relief",
    prescription: false,
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")
  const category = searchParams.get("category")
  const pharmacyId = searchParams.get("pharmacyId")

  let filteredMedicines = medicines

  if (search) {
    filteredMedicines = filteredMedicines.filter(
      (med) =>
        med.name.toLowerCase().includes(search.toLowerCase()) ||
        med.genericName.toLowerCase().includes(search.toLowerCase()),
    )
  }

  if (category) {
    filteredMedicines = filteredMedicines.filter((med) => med.category === category)
  }

  if (pharmacyId) {
    filteredMedicines = filteredMedicines.map((med) => ({
      ...med,
      availability: med.availability.filter((avail) => avail.pharmacyId === pharmacyId),
    }))
  }

  return NextResponse.json({ medicines: filteredMedicines })
}

export async function POST(request: NextRequest) {
  try {
    const { medicineId, pharmacyId, quantity } = await request.json()

    // Update stock (simulate purchase)
    const medicine = medicines.find((m) => m.id === medicineId)
    if (medicine) {
      const pharmacy = medicine.availability.find((p) => p.pharmacyId === pharmacyId)
      if (pharmacy && pharmacy.stock >= quantity) {
        pharmacy.stock -= quantity
        return NextResponse.json({
          success: true,
          message: "Medicine reserved successfully",
          remainingStock: pharmacy.stock,
        })
      } else {
        return NextResponse.json({ error: "Insufficient stock" }, { status: 400 })
      }
    }

    return NextResponse.json({ error: "Medicine not found" }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
