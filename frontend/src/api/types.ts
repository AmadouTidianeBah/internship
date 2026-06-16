// Types partagés avec le backend NestJS.
// Ils reflètent les entités TypeORM et les DTO du dossier ../backend.
// Si le backend change, mets ce fichier à jour pour rester synchro.

// ----- Enums -----

export enum UserRole {
  STUDENT = 'STUDENT',
  COMPANY = 'COMPANY',
  ADMIN = 'ADMIN',
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

// ----- Entités (ce que l'API renvoie) -----

export interface User {
  id: string
  email: string
  role: UserRole
  createAt: string
}

export interface Profile {
  id: string
  firstName: string
  lastName: string
  phone: number
  bio?: string | null
  linkdin?: string | null
  github?: string | null
  createAt: string
}

// GET /users/profile renvoie le profil fusionné avec les champs user (sans mot de passe).
export interface ProfileWithUser extends Profile {
  email: string
  role: UserRole
}

export interface Company {
  id: string
  name: string
  description: string
  website?: string | null
  location: string
  createAt: string
  internships?: Internship[]
}

export interface Internship {
  id: string
  title: string
  description: string
  requirements: string
  location: string
  duration: string
  createAt: string
  company?: Company
  applications?: Application[]
  reviews?: Review[]
}

export interface Application {
  id: string
  status: ApplicationStatus
  resume: string
  coverLetter?: string | null
  applyAt: string
  user?: User
  internship?: Internship
}

export interface Review {
  id: string
  rating?: number | null
  comment?: string | null
  createAt: string
  user?: User
  internship?: Internship
}

export interface Notification {
  id: string
  message: string
  read: boolean
  createAt: string
}

// ----- Payloads de requête (ce que tu envoies) -----

export interface RegisterPayload {
  email: string
  password: string
  role: UserRole // STUDENT ou COMPANY (ADMIN refusé par le backend)
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
}

export interface CreateProfilePayload {
  firstName: string
  lastName: string
  phone: number
  bio?: string
  linkdin?: string
  github?: string
}

export type UpdateProfilePayload = Partial<CreateProfilePayload>

export interface CreateCompanyPayload {
  name: string
  description: string
  website?: string
  location: string
}

export type UpdateCompanyPayload = Partial<CreateCompanyPayload>

export interface CreateInternshipPayload {
  title: string
  description: string
  requirements: string
  location: string
  duration: string
}

export type UpdateInternshipPayload = Partial<CreateInternshipPayload>

export interface CreateApplicationPayload {
  internshipId: string
  resume: string
  coverLetter?: string
}

export interface UpdateApplicationStatusPayload {
  status: ApplicationStatus
}
