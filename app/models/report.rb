class Report < ApplicationRecord
  belongs_to :user
  has_many :entries, dependent: :destroy

  # Could put validates
  # validates :body, presence: true

  def generate_doc(details)
    report, entries, user = details
    Caracal::Document.save 'example.docx' do |doc|
      doc.h1 'PORTLAND PROJECT 
      PORTLAND CENTER PLAZA
      THE LINC
      '
      doc.hr
      doc.h1 'SUNDAY, APRIL 12th , 2020'
      doc.h2 'Section 1'
      doc.p 'Lorem ipsum dolor....'
      doc.p
    end
  end

end
